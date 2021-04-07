import dva from 'dva';
import { createBrowserHistory } from 'history';
import dqPlugin from 'dqplugin';
import './index.css';

dqPlugin.remLayout()
// 1. Initialize
const app = dva({
  history: createBrowserHistory(),
});
// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/products').default);

// 4. Router
app.router(require('./router/index').default);

// 5. Start
app.start('#root');


