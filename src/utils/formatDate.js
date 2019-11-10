import moment from "moment";
import 'moment/locale/ru'

moment.locale('ru');

export default (date) => {
  return moment(date).format("LL");
}