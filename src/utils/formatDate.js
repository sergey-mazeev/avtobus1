import moment from "moment";
import 'moment/locale/ru'

moment.locale('ru');
// Функция принимает дату в формате `ГГГГ-ММ-ДД` (2015-02-16), возвращает в формате `LL` (22 июня 2019 г.) спомощью moment js (https://momentjs.com/docs/)
export default (date) => {
  return moment(date).format("LL");
}
