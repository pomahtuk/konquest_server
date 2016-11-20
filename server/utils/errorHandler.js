import PrettyError from 'pretty-error';

// instantiate PrettyError, which can then be used to render error objects
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');
pe.skipPackage('bluebird');
pe.start();

const errorHandler = (app) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // log error to console
    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};

export default errorHandler;
