module.exports = (function(env){

    return require(`./env.${env}`);

})(process.env.NODE_ENV || "dev");