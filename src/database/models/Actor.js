module.exports = (sequelize, DataTypes) => {
    // let alias = nome da tabela
    // let cols = nome das colunas
    // let config = configurações da tabela
    let alias = 'Actor';

    let cols = {
        id:{
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        rating:{
            type: DataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false
        },
        favorite_movie_id:{
            type: DataTypes.INTEGER(10).UNSIGNED,
        }
    };

    let config = {
        tableName: 'actors',
        timestamps: false        
    };

    let Actor = sequelize.define(alias, cols, config)

    Actor.associate = (models) => {
        Actor.belongsToMany(models.Movie,{
           as: 'movies',
           through: 'actor_movie',
           foreignKey: 'actor_id',
           otherKey: 'movie_id',
           timestamps: false
        })
    };

    return Actor
}