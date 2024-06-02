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
      where: { nim_nip: userNim_nip },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

		console.log(userNim_nip);
		const selectedTahunAjaran = req.query.tahunAjaran || '';
		const selectedMataKuliah = req.query.mataKuliah || '';

		const listDetailMataKuliah = await DetailMataKuliah.findAll({
			where: {
				nim_nip: userNim_nip,
			},
		});

		const listTahunAjaran = await TahunAjaran.findAll();
		const listMataKuliah = await MataKuliah.findAll({
			where: {
				kode_matkul: {
					[Op.in]: listDetailMataKuliah.map((detailMataKuliah) => detailMataKuliah.kode_matkul),
				},
			},
		});

		let listTranskip = [];

		if (selectedTahunAjaran && selectedMataKuliah) {
			listTranskip = await Transkrip.findAll({
				where: {
					kode_matkul: selectedMataKuliah,
					tahun_ajaran: selectedTahunAjaran,
				},
				include: [User, MataKuliah],
			});
		}

		res.render('dosen/nilai', {
      user: user,
			listTahunAjaran,
			listMataKuliah,
			selectedTahunAjaran,
			selectedMataKuliah,
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

		const mahasiswaNim_nip = req.params.nim_nip;
		const { nilai_huruf, kode_matkul, tahun_ajaran } = req.body;

		const detailMataKuliah = await DetailMataKuliah.findOne({
			where: {
				nim_nip: userNim_nip,
				kode_matkul,
			},
		});
		if (!detailMataKuliah) {
			throw new Error('Mata Kuliah tidak ditemukan, atau Anda tidak memiliki akses untuk mengaksesnya');
		}

		const nilaiMapper = [
			{ nilai_huruf: 'A', base_nilai: 4.0 },
			{ nilai_huruf: 'A-', base_nilai: 3.75 },
			{ nilai_huruf: 'B+', base_nilai: 3.5 },
			{ nilai_huruf: 'B', base_nilai: 3.0 },
			{ nilai_huruf: 'B-', base_nilai: 2.75 },
			{ nilai_huruf: 'C+', base_nilai: 2.5 },
			{ nilai_huruf: 'C', base_nilai: 2.0 },
			{ nilai_huruf: 'D', base_nilai: 1.5 },
			{ nilai_huruf: 'E', base_nilai: 1.0 },
		];

		if (!nilaiMapper.find((nilai) => nilai.nilai_huruf === nilai_huruf)) {
			throw new Error('Nilai Huruf tidak valid');
		}

		const mataKuliah = await MataKuliah.findOne({
			where: {
				kode_matkul,
			},
		});

		await Transkrip.update(
			{
				nilai_huruf,
				nilai_mutu: nilaiMapper.find((nilai) => nilai.nilai_huruf === nilai_huruf).base_nilai * mataKuliah.sks,
			},
			{
				where: {
					kode_matkul,
					tahun_ajaran,
					nim_nip: mahasiswaNim_nip,
				},
			}
		);

		res.redirect('/dosen/nilai?tahunAjaran=' + tahun_ajaran + '&mataKuliah=' + kode_matkul);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};
