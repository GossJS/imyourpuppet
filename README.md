# простые тестовые сценарии

проверяющие *без тестового фреймворка* работу серверных сценариев по заданиям z1, z2, z3, z4 введения в PHP (https://github.com/GossJS/php_starters1/edit/step0/README.md)

используется пара request-jsdom (т.к. среда Cloud9 особым образом выдаёт ответы, так что zombie не срабатывает - но т.к. сценарий серверный, в Zombie и нет особой нужды)

также могут быть использованы для аналогичных серверных сценариев на Node

показывают также, что для тестирования клиентского сценария не обойтись без Zombie или Puppeteer; при этом серверный сценарий на node (kodaktor.ru/api2/time) может быть протестирован и с помощью Zombie, и с помощью пары request-jsdom

---

z1 вывод времени

выведите с помощью date_default_timezone_set и date дату в формате

13/12/2017 05:50

---

z4 вычисление степени по двум аргументам - здесь только request-jsdom

---

z5 - замена символов в строке 


