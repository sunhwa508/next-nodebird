module.exports = (sequelize, DataTypes)=>{
    const Post = sequelize.define('Post', { // MySQL에는 Posts라는 테이블 생성
        content: {
            type: DataTypes.TEXT,
            allowNull:false,
        },
        // db.Post.belongsTo(db.Post,{ as: 'Retweet'});
        // PostId => RetweetId
    },{
        // 한글과 이모티콘을 쓸수 있게 해준다.(한글, 이모티콘 저장)
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
        db.Post.belongsTo(db.Post,{ as: 'Retweet'});
    };
    return Post;
}