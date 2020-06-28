let a = 1 // 类型推断
a = '1'

let b: string
b = 1
b = '1'

let c: string[]
c = [1]
c = ['1']

let d: any[] = [1,'3']

let e: number|boolean = '2'

let f: 1|2 = 3

function foo (a:number): void { // 函数返回值声明
  return 1
}
function foo1 (a:number): number {
  return 1
}
foo1('2')

// 类型
// 大写构造函数
// 小写类型声明

function foo3 (a:number, b: number, c?: number): number {
  return 1
}
foo3(1)
foo3(1,2)
foo3(1,2,3)