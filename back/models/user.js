module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define('User', { // MySQL에는 users라는 테이블 생성
        // id는 mysql에서 자동으로 생성되기 때문에 넣어줄 필요 없다.
        // id: {},
        email: {
            type:DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false, //필수값
            unique: true //고유값
        },
        nickname: {
            type:DataTypes.STRING(30),
            allowNull: false, //필수값
        },
        password: {
            // 패스워드는 암호화를 하기 때문에 넉넉하게 잡아주는 것이 좋다. 
            type:DataTypes.STRING(100),
            allowNull: false, //필수값
        },
    },{
        // 한글을 쓸수 있게 해준다.(한글 저장)
        charset: 'utf8',
        collate: 'utf8_general_ci' 
    });
    User.associate = (db) => {
        // User은 post를 여러개 가질 수 있다.
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post,{ through: 'Like' ,  as: 'Liked'});
        db.User.belongsToMany(db.User,{ through: 'Follow', as:'Followers', foreignKey: 'followingId'})
        db.User.belongsToMany(db.User,{ through: 'Follow', as:'Followings', foreignKey: 'followerId'})
    };
    return User;
}