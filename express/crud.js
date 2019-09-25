import {models} from './models';

const {
    Article
    , Comment
} = models;

const create = async()=>{
    
    /*
    const article = await Article.findOne({
        where: { idx: 1 }
    });
    */

    //const article = await Article.findByPk(1);
    const article = await Article.create({
        subject : 'article subject'
        , contents : 'article content'
    });

    const comment = Comment.build({
        subject : 'Comment subject...'
        , contents : 'Comment contents'
    });

    //article.instanceMethod();
    //Article.staticMethod();

    await article.addComments();
}

const createPost = async()=>{

    const article = await Article.create({
        subject : 'subject...'
        , contents : 'contents...'
    });
}

export {
    create
}