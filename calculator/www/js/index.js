
(function() {
  "use strict";


  // charAt = возвращает указанный символ из строки.

  // querySelector = Возвращает первый элемент внутри документа
  //  или который совпадает с определенной группой селекторов.

  // getAttribute =возвращает значение указанного атрибута элемента. 
  //   Если элемент не содержит данный атрибут, могут быть возвращены null или "" (пустая строка); 

  // setAttribute = Добавляет новый атрибут или изменяет значение существующего атрибута у выбранного элемента.







  //Ярлык для получения элементов
  var el = function(element) {
    if (element.charAt(0) === "#") { // если прошел ID...
      return document.querySelector(element); //... возвращает один элемент
    }

    return document.querySelectorAll(element); // В противном случае возвращает список узлов
  };

  // Variables
  var viewer = el("#viewer"), //Экран калькулятора, где отображается результат
    equals = el("#equals"), // кнопка равно
    nums = el(".num"), // список цифр
    ops = el(".ops"), // список операторов
    theNum = "", // текущий номер
    oldNum = "", // первый номер
    resultNum, // Result
    operator; 

  // при нажатии на номер Получить текущий выбранный номер
  var setNum = function() {
    if (resultNum) { //Если результат был отображен, то сбросить номер
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else { // В противном случае добавьте цифру к предыдущему номеру 
      theNum += this.getAttribute("data-num");
    }

    viewer.innerHTML = theNum; // показать текущий номер

  };

  // при нажатии на оператора. Передай номер oldNum и сохрани оператор
  var moveNum = function() {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", ""); // Сбросить результат в attr
  };

  // при нажатии. Рассчитать результат
  var displayNum = function() {

    // Преобразовать ввод строки в числа
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // выполнение операций
    switch (operator) {
      case "plus":
        resultNum = oldNum + theNum;
        break;

      case "minus":
        resultNum = oldNum - theNum;
        break;

      case "times":
        resultNum = oldNum * theNum;
        break;

      case "divided by":
        resultNum = oldNum / theNum;
        break;

        //Если равен оператор без оператора, сохранить номер и продолжить
      default:
        resultNum = theNum;
    }

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) { // Если результат не число; например, операторы двойного щелчка
        resultNum = "You broke it!";
      } else { // Если результат равен бесконечности, то делим на ноль
        resultNum = "Look at what you've done";
        el('#calculator').classList.add("broken"); //Перерыв калькулятор
        el('#reset').classList.add("show"); // И покажу кнопку сброса
      }
    }

    // показать результат
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    // Теперь сбрасываем oldNum и сохраняем результат
    oldNum = 0;
    theNum = resultNum;

  };

  //при нажатии на кнопку очистить очистить все
  var clearAll = function() {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  /* событие клика */

  // Добавить событие клика к номерам
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  // Добавить событие клика для операторов
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  // Добавить событие клика в знак равенства
  equals.onclick = displayNum;

  // Добавить событие клика, чтобы очистить кнопку
  el("#clear").onclick = clearAll;

  // событие click для сброса кнопки
  el("#reset").onclick = function() {
    window.location = window.location;
  };

}());