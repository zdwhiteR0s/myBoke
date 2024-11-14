export const typescriptPost = {
  id: 2,
  title: 'TypeScript 高级特性详解',
  summary: '深入探讨 TypeScript 的高级特性，包括泛型、装饰器、类型体操等内容，帮助你更好地掌握 TypeScript 的类型系统...',
  content: `
# TypeScript 高级特性详解

## 引言
TypeScript 作为 JavaScript 的超集，提供了强大的类型系统和面向对象编程的特性。本文将深入探讨 TypeScript 的高级特性，帮助你更好地掌握这门语言。

## 泛型（Generics）

### 1. 基础泛型
\`\`\`typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
\`\`\`

### 2. 泛型约束
\`\`\`typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // 现在我们知道它有length属性
  return arg;
}
\`\`\`

### 3. 泛型工具类型
\`\`\`typescript
// Partial - 将所有属性变为可选
type PartialPoint = Partial<{ x: number; y: number }>;

// Required - 将所有属性变为必需
type RequiredPoint = Required<{ x?: number; y?: number }>;

// Pick - 从类型中选择部分属性
type PickPoint = Pick<{ x: number; y: number; z: number }, 'x' | 'y'>;

// Record - 创建具有特定类型属性的类型
type PageInfo = Record<'home' | 'about' | 'contact', { title: string }>;
\`\`\`

## 高级类型

### 1. 交叉类型与联合类型
\`\`\`typescript
// 交叉类型
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

// 联合类型
type ComplexType = string | number | boolean;

// 类型守卫
function isString(test: any): test is string {
  return typeof test === "string";
}
\`\`\`

### 2. 映射类型
\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

// 实际应用
interface Person {
  name: string;
  age: number;
}

type ReadonlyPerson = Readonly<Person>;
type OptionalPerson = Optional<Person>;
\`\`\`

## 装饰器（Decorators）

### 1. 类装饰器
\`\`\`typescript
function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  };
}

@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}
\`\`\`

### 2. 方法装饰器
\`\`\`typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${propertyKey} with \${args}\`);
    return originalMethod.apply(this, args);
  };
  return descriptor;
}

class Calculator {
  @log
  add(x: number, y: number) {
    return x + y;
  }
}
\`\`\`

## 类型体操进阶

### 1. 条件类型
\`\`\`typescript
type TypeName<T> = 
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";

// 使用示例
type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;     // "string"
type T2 = TypeName<true>;    // "boolean"
\`\`\`

### 2. 递归类型
\`\`\`typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P];
};

// 使用示例
interface NestedObject {
  a: {
    b: {
      c: string;
    };
  };
}

type DeepReadonlyNested = DeepReadonly<NestedObject>;
\`\`\`

## 实战应用

### 1. API 类型定义
\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}
\`\`\`

### 2. 状态管理类型
\`\`\`typescript
interface State {
  user: User | null;
  posts: Post[];
  loading: boolean;
  error: string | null;
}

type Action = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    // ... 其他 case
  }
}
\`\`\`

## 性能优化

### 1. 类型推断优化
\`\`\`typescript
// 使用 typeof 进行类型推断
const colors = {
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff'
} as const;

type Colors = typeof colors;
type ColorKeys = keyof Colors;
\`\`\`

### 2. 类型缓存
\`\`\`typescript
// 使用类型别名缓存复杂类型
type ComplexType<T> = {
  [P in keyof T]: T[P] extends object 
    ? ComplexType<T[P]> 
    : T[P];
};

// 缓存后使用
type CachedType = ComplexType<SomeType>;
\`\`\`

## 最佳实践

1. **类型定义规范**
   - 使用 interface 定义对象类型
   - 使用 type 定义联合类型和交叉类型
   - 合理使用泛型约束

2. **代码组织**
   - 按功能模块组织类型定义
   - 使用命名空间管理相关类型
   - 导出公共类型定义

3. **错误处理**
   - 使用类型守卫进行运行时类型检查
   - 合理使用断言
   - 处理可能的空值情况

## 总结

TypeScript 的高级特性为我们提供了强大的类型系统支持，通过合理使用这些特性，我们可以：
1. 提高代码的可维护性
2. 减少运行时错误
3. 提供更好的开发体验
4. 实现更复杂的类型约束

关键是要理解这些特性的使用场景，并在实际项目中合理运用。
`,
  author: '戴振朋',
  date: '2024-03-19',
  tags: ['TypeScript', '前端开发'],
  readTime: '8分钟',
  likes: 35,
  views: 95,
  coverImage: 'https://picsum.photos/800/401'
}; 