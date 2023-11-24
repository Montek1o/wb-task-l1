// Task:
// Задача на классы и наследование: создайте базовый класс Shape (фигура), который имеет методы для расчета площади и периметра. 
// Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, круг и треугольник. 
// Реализуйте методы расчета площади и периметра для каждой фигуры.

// создали базовый класс
class Shape {
  constructor(name) {
    this.name = name;
  }
  // методы для каждой фигуры придется переопределять, поэтому в базовом классе они пустые
  areaСalculation() {}

  perimeterСalculation() {}
}

class Rectangle extends Shape {
  // добавляем прямоугольнику свои собственные свойства: ширину и высоту (либо сторону a и сторону b)
  constructor(name, width, height) {
    // если в наследуемом классе мы используем свой конструктор, то чтобы наследовать свойства от родительского класса, 
    // необходимо вызвать super, и обязательно перед использованием this.
    super(name);
    this.width = width;
    this.height = height;
  }
  // площадь прямоугольника равна умножению его сторон
  areaСalculation() {
    return this.width * this.height;
  }
  // периметр прямоугольника равен сложению всех его сторон
  perimeterСalculation() {
    return (this.width + this.height) * 2;
  }
}

class Circle extends Shape {
  // добавляем кругу своё собственное свойство: радиус
  constructor(name, radius) {
    super(name);
    this.radius = radius;
  }
  // площадь круга равна числу Pi умноженного на радиус в квадрате
  areaСalculation() {
    return Math.PI * this.radius ** 2;
  }
  // периметр круга равен числу Pi умноженного на радиус умноженного на два
  perimeterСalculation() {
    return Math.PI * this.radius * 2;
  }
}

class Triangle extends Shape {
  // добавляем треугольнику свои собственные свойства: три стороны
  constructor(name, firstSide, secondSide, thirdSide) {
    super(name);
    this.firstSide = firstSide;
    this.secondSide = secondSide;
    this.thirdSide = thirdSide;
  }
  // для вычисления площади треугольника использовали формулу Герона
  areaСalculation() {
    const semiP = this.perimeterСalculation() / 2;
    return Math.sqrt(semiP * (semiP - this.firstSide) * (semiP - this.secondSide) * (semiP - this.thirdSide));
  }
  // периметр треугольника равен сложению всех его сторон
  perimeterСalculation() {
    return this.firstSide + this.secondSide + this.thirdSide;
  }
}

const rectangle = new Rectangle('rectangle', 5, 10);
const circle = new Circle('circle', 6);
const triangle = new Triangle('triangle', 8, 7, 9);

console.log(rectangle.areaСalculation()); // 50
console.log(rectangle.perimeterСalculation()); // 30
console.log(circle.areaСalculation()); // 113.09733
console.log(circle.perimeterСalculation()); // 37.69911
console.log(triangle.areaСalculation()); // 26.83281
console.log(triangle.perimeterСalculation()); // 24
