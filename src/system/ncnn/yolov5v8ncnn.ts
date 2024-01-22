

runtime.images.initOpenCvIfNeeded();
importClass('org.opencv.imgproc.Imgproc');
importClass('org.opencv.imgcodecs.Imgcodecs');
importClass('org.opencv.core.Point');
importClass('org.opencv.core.Scalar');

const ncnnPath = '/sdcard/assttyys/ncnn';

function getCurrAbi() {
	const abis = android.os.Build.SUPPORTED_ABIS;
	if (abis.indexOf('x86') > -1) {
		return 'x86';
	} else if (abis.indexOf('x86_64') > -1) {
		return 'x86_64';
	} else if (abis.indexOf('arm64-v8a') > -1) {
		return 'arm64-v8a';
	} else if (abis.indexOf('armeabi-v7a') > -1) {
		return 'armeabi-v7a';
	}
}

const _s = {
	cpugpu: 0,
	labels: [
		'buff-DengLong', 'buff-DongJie', 'buff-DouZiHuoQu', 'buff-GaiLvUP', 'buff-GuiWang', 'buff-HaoYouGaiLvUP', 'buff-JiaSuSaDou', 'buff-JianSu',
		'hit', 'hit-GuiWang', 'hit-success', 'n-BiAnHuaGua', 'n-ChiShe', 'n-ChiShe-GuiWang', 'n-CiMuGua', 'n-DaTianGouGua', 'n-DaoMuXiaoGui',
		'n-DaoMuXiaoGui-GuiWang', 'n-DengLongGui', 'n-HuaNiaoJuanGua', 'n-HuangChuanZhiZhuGua', 'n-HuangChuanZhiZhuGua-GuiWang', 'n-HuangGua',
		'n-HuangGua-GuiWang', 'n-HuiYeJiGua', 'n-JiShengHun', 'n-JiShengHun-GuiWang', 'n-JiuTunGua', 'n-QingXingDengGua', 'n-TangZhiSanYao',
		'n-TangZhiSanYao-GuiWang', 'n-TiDengXiaoSeng', 'n-TiDengXiaoSeng-GuiWang', 'n-TianXieGuiChi', 'n-TianXieGuiHuang', 'n-TianXieGuiHuang-GuiWang',
		'n-TianXieGuiLv', 'n-TianXieGuiLv-GuiWang', 'n-TianXieGuiQing', 'n-TianXieGuiQing-GuiWang', 'n-TuBi', 'n-TuBi-GuiWang', 'n-XiaoLuNanGua',
		'n-XueTongZiGua', 'n-YanMoGua', 'n-YaoDaoJiGua', 'n-YiMuLianGua', 'n-YuZhuanJinGua', 'n-ZhouShen', 'n-ZhouShen-GuiWang', 'r-BingYong',
		'r-BingYong-GuiWang', 'r-ChongShi', 'r-ChongShi-GuiWang', 'r-ChouShiZhiNv', 'r-ChouShiZhiNv-GuiWang', 'r-DuYanXiaoSeng', 'r-DuYanXiaoSeng-GuiWang',
		'r-EGui', 'r-GouChang', 'r-GouChang-GuiWang', 'r-GuLongHuo', 'r-GuLongHuo-GuiWang', 'r-GuanHu', 'r-GuanHu-GuiWang', 'r-HeTong', 'r-HeTong-GuiWang',
		'r-HuDieJing', 'r-JiaoTu', 'r-JiaoTu-GuiWang', 'r-JiuMingMao', 'r-JiuMingMao-GuiWang', 'r-Jue', 'r-Jue-GuiWang', 'r-LiMao', 'r-LiYuJing',
		'r-LiYuJing-GuiWang', 'r-QingWaCiQi', 'r-QingWaCiQi-GuiWang', 'r-SanWeiHu', 'r-SanWeiHu-GuiWang', 'r-ShanTong', 'r-ShanTong-GuiWang',
		'r-ShanTu', 'r-ShanTu-GuiWang', 'r-ShiFaGui', 'r-ShiFaGui-GuiWang', 'r-ShouWu', 'r-ShouWu-GuiWang', 'r-TiaoTiaoDiDi', 'r-TiaoTiaoDiDi-GuiWang',
		'r-TiaoTiaoMeiMei', 'r-TiaoTiaoMeiMei-GuiWang', 'r-TieShu', 'r-TieShu-GuiWang', 'r-TongNan', 'r-TongNv', 'r-TongNv-GuiWang', 'r-WuGuShi',
		'r-WuShiZhiLing', 'r-WuShiZhiLing-GuiWang', 'r-XiaoXiuZhiShou', 'r-XiaoXiuZhiShou-GuiWang', 'r-YaTianGou', 'r-YaTianGou-GuiWang', 'r-YingCao',
		'r-YingCao-GuiWang', 'r-YingE', 'r-YingE-GuiWang', 'r-YuNv', 'r-ZuoFuTongZi', 'r-ZuoFuTongZi-GuiWang', 'sp-CangFengYiMuLian-GuiWang',
		'sp-ChanBingXueNv', 'sp-ChanXinYunWaiJing', 'sp-ChiYingYaoDaoJi', 'sp-ChuLingShanFeng', 'sp-DaiXiaoGuHuoNiao', 'sp-FuGuQingJi', 'sp-GuiWangJiuTunTongZi',
		'sp-HuiShiHuaNiaoJuan', 'sp-JinTianYuZaoQian', 'sp-KongXiangMianLingQi', 'sp-LianYuCiMuTongZi', 'sp-LianYuCiMuTongZi-GuiWang', 'sp-LingHaiJinYuJi',
		'sp-LiuGuangZhuiYueShen', 'sp-MengXunShanTu', 'sp-ShaoYuDaTianGou', 'sp-ShenQiHuang', 'sp-TianJianRenXinGuiQie', 'sp-XiaoLangHuangChuanZhiZhu',
		'sp-XiuLuoGuiTongWan-GuiWang', 'sp-YeMingBiAnHua', 'sp-YuYuanBoRe', 'sp-YuYuanBoRe-GuiWang', 'sr-BaiLang', 'sr-BaiLang-GuiWang', 'sr-BaiMuGui',
		'sr-BaiMuGui-GuiWang', 'sr-BaiTongZi', 'sr-BaiTongZi-GuiWang', 'sr-BoRe', 'sr-BoRe-GuiWang', 'sr-ChuanYuan', 'sr-ErKouNv', 'sr-FenPoPo',
		'sr-FenPoPo-GuiWang', 'sr-FengHuangHuo', 'sr-FengHuangHuo-GuiWang', 'sr-FengLi', 'sr-GuHuoNiao', 'sr-GuHuoNiao-GuiWang', 'sr-GuNv', 'sr-GuiNvHongYe',
		'sr-GuiShiBai', 'sr-GuiShiHei', 'sr-HaiFangZhu', 'sr-HeiTongZi', 'sr-HeiTongZi-GuiWang', 'sr-HuaJing', 'sr-HuiBiShou', 'sr-HuiMingDeng',
		'sr-HuiMingDeng-GuiWang', 'sr-JiaLouLuo', 'sr-JiaLouLuo-GuiWang', 'sr-JinYuJi', 'sr-JiuCiLiang', 'sr-JiuCiLiang-GuiWang', 'sr-KuiLeiShi',
		'sr-KuiLeiShi-GuiWang', 'sr-LianYou', 'sr-LingHaiDie', 'sr-LuoXinFu', 'sr-MaoZhangGui', 'sr-MengPo', 'sr-MengPo-GuiWang', 'sr-PanGuan',
		'sr-PanGuan-GuiWang', 'sr-QingFangZhu', 'sr-QingFangZhu-GuiWang', 'sr-QingJi', 'sr-QingJi-GuiWang', 'sr-QuanShen', 'sr-QuanShen-GuiWang',
		'sr-RiHeFang', 'sr-RuLianShi', 'sr-RuNeiQue', 'sr-ShiMengMo', 'sr-ShuWeng', 'sr-TaoHuaYao', 'sr-TianNiMei-GuiWang', 'sr-TiaoTiaoGeGe', 'sr-XiXueJi',
		'sr-XiXueJi-GuiWang', 'sr-XiaZhongShaoNv', 'sr-XiaZhongShaoNv-GuiWang', 'sr-XiaoSongWan', 'sr-XiaoSongWan-GuiWang', 'sr-XieJi', 'sr-XieNv',
		'sr-XieNv-GuiWang', 'sr-XingXiongTongZi', 'sr-XueNv', 'sr-Xun', 'sr-Xun-GuiWang', 'sr-YanYanLuo', 'sr-YaoHu', 'sr-YaoHu-GuiWang', 'sr-YaoQinShi',
		'sr-YeCha', 'sr-Yi', 'sr-YiFanMuMian', 'sr-YiFanMuMian-GuiWang', 'sr-YiJinZhenTian', 'sr-YiXiGong', 'sr-YiXiGong-GuiWang', 'sr-YingHuaYao',
		'sr-YuJuChong', 'sr-YuJuChong-GuiWang', 'sr-Zhen', 'sr-ZhiWu', 'sr-ZhuiYueShen', 'sr-ZhuiYueShen-GuiWang', 'ssr-AXiuLuo', 'ssr-BaQiDaShe',
		'ssr-BaiZangZhu', 'ssr-BuJianYue', 'ssr-BuZhiHuo', 'ssr-CiMuTongZi', 'ssr-DaTianGou', 'ssr-DaYueWan', 'ssr-GuiQie', 'ssr-GuiTongWan', 'ssr-HuaNiaoJuan',
		'ssr-Huang', 'ssr-HuiYeJi', 'ssr-JiuTunTongZi', 'ssr-LingLuYuQian', 'ssr-LingYanJi', 'ssr-MianLingQi', 'ssr-QianJi', 'ssr-ShanFeng', 'ssr-XiaoLuNan',
		'ssr-XiaoLuNan-GuiWang', 'ssr-XueTongZi', 'ssr-XunXiangXing', 'ssr-YanLing', 'ssr-YanMo', 'ssr-YanMo-GuiWang', 'ssr-YaoDaoJi', 'ssr-YiMuLian',
		'ssr-YuZaoQian', 'ssr-YuZhuanJin', 'ssr-YuanJieShen', 'ssr-YueDu', 'ssr-YunWaiJing', 'ssr-YunWaiJing-GuiWang', 'status-DongJie', 'status-HaoYouGaiLvUP',
		'status-JiaSuSaDou', 'status-JianSu', 'ui-Button-Start', 'yunv'
	],

	yolov5: function (model, target_size) {
		const ncnnParam = ncnnPath + '/model/' + model + '.param';
		const ncnnBin = ncnnPath + '/model/' + model + '.bin';
		const dexPath = ncnnPath + '/dex/mengxin_yolov8ncnn.dex';
		const soDir = ncnnPath + '/lib/' + getCurrAbi() + '/';
		const dcl = _s.getDexClassLoader(dexPath, soDir);
		const yolo = dcl.loadClass('com.mengxin.ncnn.Yolov8Ncnn').newInstance();
		yolo.yolov5(ncnnParam, ncnnBin, target_size, _s.cpugpu);
		return yolo;
	},
	// yolov8: function (model, target_size) {
	// 	const ncnnParam = ncnnPath + '/model/' + model + '.param';
	// 	const ncnnBin = ncnnPath + '/model/' + model + '.bin';
	// 	const dexPath = ncnnPath + '/dex/mengxin_yolov8ncnn.dex';
	// 	const soDir = ncnnPath + '/lib/' + getCurrAbi() + '/';
	// 	const dcl = _s.getDexClassLoader(dexPath, soDir);
	// 	const yolo = dcl.loadClass('com.mengxin.ncnn.Yolov8Ncnn').newInstance();
	// 	yolo.yolov8(ncnnParam, ncnnBin, target_size, _s.cpugpu);
	// 	return yolo;
	// },
	getDexClassLoader: function (dexPath, soDir) {
		if (this.dcl != null) {
			return this.dcl;
		}
		const dirDir = context.getDir('dex', android.app.Activity.MODE_PRIVATE).getAbsolutePath(); //  /data/user/0/org.autojs.autojspro/app_dex
		const jniDir = context.getDir('libs', android.app.Activity.MODE_PRIVATE); //  /data/user/0/org.autojs.autojspro/app_libs
		files.removeDir(jniDir);

		const newjniDir = jniDir + '/' + (new Date().getTime()) + '/'; // 转时间戳
		files.createWithDirs(newjniDir); // 创建文件夹

		const soList = files.listDir(soDir, function (f) { // 遍历目录的so文件 /sdcard/脚本/ncnn//lib/arm64-v8a
			return f.endsWith('.so');
		});

		for (let i = 0; i < soList.length; i++) {
			const f1 = new java.io.File(soDir, soList[i]).getAbsolutePath(); //  /sdcard/脚本/ncnn/lib/arm64-v8a/libmx.so
			const f2 = new java.io.File(newjniDir, soList[i]).getAbsolutePath(); //  /data/user/0/org.autojs.autojspro/app_libs/1695914766343/libmx.so
			files.copy(f1, f2);
		}
		// @ts-expect-error 不认识Packages
		const dcl = new Packages.dalvik.system.DexClassLoader(dexPath, dirDir, newjniDir, java.lang.ClassLoader.getSystemClassLoader());
		this.dcl = dcl;
		return this.dcl;
	},
	// drawAndSave: function (bbox, img) {
	//     //const mat = Imgcodecs.imread(imgPath);
	//     const mat = img.mat;
	//     Imgproc.cvtColor(mat, mat, Imgproc.COLOR_BGR2RGB);
	//     for (const i = 0; i < bbox.length; i++) {
	//         const box = bbox[i];
	//         const x1 = box[0];
	//         const y1 = box[1];
	//         const x2 = box[2];
	//         const y2 = box[3];
	//         const prob = box[4];
	//         const label = box[5];
	//         Imgproc.rectangle(mat, Point(x1, y1), Point(x2, y2), Scalar(255, 255, 0));
	//     }

	//     Imgcodecs.imwrite('/storage/emulated/0/assttyys/ncnn/yolo.jpg', mat);
	// }
}

export default _s;