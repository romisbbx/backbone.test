// Функция которая по числу выдает правильное склонение слова из трех представленых
// Пример использования:
//      {{ declension(5, ['комментарий', 'комментария', 'комментариев']) }}
//
Twig.extendFunction('declension', function(num, strArr) {
	var plural = (num%10 == 1 && num%100 != 11) ? 0 : (num%10 >= 2 && num%10 <= 4 && (num%100 < 10 || num%100 >= 20) ? 1 : 2);

	return strArr[plural] || '';
});