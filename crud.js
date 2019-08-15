import {models} from './models';

const {
    Article
    , Comment
} = models

const create = async()=>{
    
    /*
    const article = await Article.findOne({
        where: { idx: 1 }
    });
    */

    const article = await Article.findByPk(1);

    console.log(article.idx);

    const comment = Comment.build({
        subject : 'Comment subject...'
        , contents : 'Comment contents'
    });

    //article.instanceMethod();
    //Article.staticMethod();

    await article.addComments();
}

create();

export {
    create
}