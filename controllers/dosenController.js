const { DetailMataKuliah } = require('../models/index');
const { TahunAjaran } = require('../models/index');
const { MataKuliah } = require('../models/index');
const { Transkrip } = require('../models/index');
const { User } = require('../models/index');
const { Op } = require('sequelize');

exports.getNilai = async (req, res) => {
	try {
		const userNim_nip = req.userNim_nip;

		const user = await User.findOne({
			where: { nim_nip: userNim_nip },
	      });

		let { tahunAjaran, mataKuliah } = req.query;

		const listTahunAjaran = await TahunAjaran.findAll();
		const listMataKuliah = await MataKuliah.findAll({
			include: [
				{
					model: DetailMataKuliah,
					as: DetailMataKuliah.tableName,
					where: {
						nim_nip: userNim_nip,
					},
				},
			],
		}).then((listMataKuliah) => {
			return listMataKuliah.map(({ kode_matkul, nama_matkul }) => {
				return {
					kode_matkul,
					nama_matkul: `${nama_matkul} ${kode_matkul.at(-1)}`,
				};
			});
		});

		tahunAjaran ??= listTahunAjaran.at(0).tahun_ajaran;
		mataKuliah ??= listMataKuliah.at(0).kode_matkul;

		let listTranskip = [];
		if (tahunAjaran && mataKuliah) {
			listTranskip = await Transkrip.findAll({
				where: {
					kode_matkul: mataKuliah,
					tahun_ajaran: tahunAjaran,
				},
				include: [User, MataKuliah],
			});
		}

		res.render('dosen/nilai', {
			user: user,
			listTahunAjaran,
			listMataKuliah,
			selectedTahunAjaran: tahunAjaran,
			selectedMataKuliah: mataKuliah,
			listTranskip,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

exports.updateNilai = async (req, res) => {
	try {
		const userNim_nip = req.userNim_nip;
		const { kode_matkul, tahun_ajaran, ...rest } = req.body;

		if (Object.keys(rest).length === 0) {
			return res.redirect('back');
		}

		const nilaiMapper = [
			{ nilai_huruf: 'A', base_nilai: 4.0 },
			{ nilai_huruf: 'A-', base_nilai: 3.75 },
			{ nilai_huruf: 'B+', base_nilai: 3.5 },
			{ nilai_huruf: 'B', base_nilai: 3.0 },
			{ nilai_huruf: 'B-', base_nilai: 2.75 },
			{ nilai_huruf: 'C+', base_nilai: 2.5 },
			{ nilai_huruf: 'C', base_nilai: 2.0 },
			{ nilai_huruf: 'D', base_nilai: 1.0 },
			{ nilai_huruf: 'E', base_nilai: 0.0 },
		];

		const detailMataKuliah = await DetailMataKuliah.findOne({
			where: {
				nim_nip: userNim_nip,
				kode_matkul,
			},
		});
		if (!detailMataKuliah) {
			throw new Error(
				'Mata Kuliah tidak ditemukan, atau dosen tidak memiliki akses untuk mengaksesnya'
			);
		}

		const tahunAjaran = await TahunAjaran.findOne({
			where: {
				tahun_ajaran,
			},
		});
		if (!tahunAjaran) {
			throw new Error('Tahun Ajaran tidak ditemukan');
		}

		const mataKuliah = await MataKuliah.findOne({
			where: {
				kode_matkul,
			},
		});
		if (!mataKuliah) {
			throw new Error('Mata Kuliah tidak ditemukan');
		}

		const listNilaiChange = [
			...Object.entries(rest).map(([nim_nip, nilai_huruf]) => {
				const nilai = nilaiMapper.find(
					(nilai) => nilai.nilai_huruf === nilai_huruf
				);

				if (!nilai) {
					throw new Error('Nilai Huruf tidak valid');
				}

				return {
					nim_nip,
					nilai_huruf,
					nilai_mutu: nilai.base_nilai * mataKuliah.sks,
				};
			}),
		];

		await Promise.all(
			listNilaiChange.map(
				async ({ nim_nip, nilai_huruf, nilai_mutu }) => {
					const transkrip = await Transkrip.findOne({
						where: {
							kode_matkul,
							tahun_ajaran,
							nim_nip,
						},
					});

					if (!transkrip) {
						throw new Error('Transkrip tidak ditemukan');
					}

					await Transkrip.update(
						{
							nilai_huruf,
							nilai_mutu,
						},
						{
							where: {
								kode_matkul,
								tahun_ajaran,
								nim_nip,
							},
						}
					);
				}
			)
		);

		return res.redirect('/dosen/nilai');
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};
