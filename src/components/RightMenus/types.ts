export interface MenuItem<T> {
  info: string;
  handle: (parmas?: T) => void;

  icon?: string;
  disabled?: boolean;
  hidden?: boolean;
  children?: MenuItem<T>[]; // 子菜单
}


export interface Menu <T>{
  parmas?: T;
  items: MenuItem<T>[];
}