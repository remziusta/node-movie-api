const mongoose = require('mongoose');


module.exports = () => {
  mongoose.connect("mongodb+srv://admin-api:123.456@movie-api-pgbkm.mongodb.net/test?retryWrites=true&w=majority",{
      useNewUrlParser:true,
      useUnifiedTopology:true
  });

  mongoose.connection.on('open', ()=> {
      console.log("Bağlantı başarılı");
  });
  mongoose.connection.on('error', (err) => {
     console.log("Bağlantı Başarısız....")
  });

  mongoose.Promise = global.Promise;
};