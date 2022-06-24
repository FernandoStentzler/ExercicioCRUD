module.exports = (sequelize, DataTypes) => {
    // let alias = nome da tabela
    // let cols = nome das colunas
    // let config = configurações da tabela
    let alias = 'Movie';

    let cols = {
        id:{
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING(500),
            allowNull: false
        },
        rating:{
            type: DataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false
        },
        awards:{
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        release_date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        length:{
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        genre_id:{
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };

    let config = {
        tableName: 'movies',
        timestamps: false
    };

    let Movie = sequelize.define(alias, cols, config)

    Movie.associate = (models) => {
        Movie.belongsTo(models.Genre,{
           as: 'genres',
           foreignKey: 'genre_id'
        }); 

        Movie.belongsToMany(models.Actor,{
            as: 'actors',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        });
    };

    return Movie
}