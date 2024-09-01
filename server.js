import express from 'express'
import './dbConnection/connection.js'
import routes from './routes/routes.js'
import { fileURLToPath } from 'url';
import path,{dirname} from 'path';
import flash from 'connect-flash';
import session from 'express-session';
import ejs from 'ejs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 7777;

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(session({
  secret: 'keyboard-cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.use(flash());
app.use('/',routes)

app.listen(port,()=>{
  console.log(`Server Running on Port: ${port}`);
})