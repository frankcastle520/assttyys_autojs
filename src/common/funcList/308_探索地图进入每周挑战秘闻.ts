import { InterfaceFuncOrigin, InterfaceFuncOperatorOrigin} from '@/interface/InterfaceFunc';
const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;

export class Func308 implements InterfaceFuncOrigin {
  id = 308;
  name = '探索地图进入每周挑战秘闻';
  desc = '从探索地图进入每周挑战秘闻';
  operator: InterfaceFuncOperatorOrigin[] = [{
    desc: [1280, 720,//探索内点击秘闻
      [
        [left, 45, 60, 0xeff5fb],
        [right, 1168, 146, 0xd9cec1],
        [right, 1124, 32, 0xd7b388],
        [right, 1226, 30, 0xd3af84],
        [left, 18, 705, 0x754830],
        [left, 210, 711, 0x985b32],
      ]
    ],
    oper: [
      [center, 1280, 720, 641, 638, 692, 676, 1500],
    ]
  }, {//每周挑战秘闻弹窗，暗
    desc: [1280, 720,
      [[left, 110, 42, 0x44423d],
      [left, 211, 38, 0x44423e],
      [left, 31, 634, 0x211719],
      [right, 1255, 706, 0x2b2326],
      [right, 1264, 364, 0x110b0b],
      [center, 886, 24, 0x4b290d]]
    ],
    oper: [
      [center, 1280, 720, 1020, 112, 1230, 371, 1000]
    ]
  },
  {//每周挑战秘闻选择并进入
    desc: [1280, 720,
      [[left, 110, 42, 0xe0daca],
      [left, 211, 38, 0xe2dccc],
      [left, 50, 598, 0x2c2e3c],
      [left, 26, 149, 0x101014],
      [center, 465, 641, 0x857d6c],
      [right, 1258, 576, 0x3c2830]]
    ],
    oper: [
      [center, 1280, 720, 134, 150, 450, 246, 500],
      [center, 1280, 720, 1142, 598, 1239, 688, 500],
    ]
  }
  ]
}