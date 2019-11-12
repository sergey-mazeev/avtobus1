import React from 'react';
import ReactDOM from 'react-dom';
// основные стили. По большей части в проекте используется css in js
import './index.scss';
// Импорт основного модуля приложения
import TaskManager from './components/TaskManager';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';

ReactDOM.render(<TaskManager />, document.getElementById('root'));

// регистрация сервисворкеров для работы приложения офлайн
serviceWorker.register();
