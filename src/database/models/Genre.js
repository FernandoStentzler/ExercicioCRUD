module.exports = (sequelize, DataTypes) => {
    // let alias = nome da tabela
    // let cols = nome das colunas
    // let config = configurações da tabela
    let alias = 'Genre';

    let cols = {
        id:{
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        ranking:{
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        active:{
            type: DataTypes.INTEGER(1).UNSIGNED,
        }
    };

    let config = {
        tableName: 'genres',
        timestamps: false        
    };

    let Genre = sequelize.define(alias, cols, config)

    Genre.associate = (models) => {
        Genre.hasMany(models.Movie,{
           as: 'movies',
           foreignKey: 'genre_id' 
        })
    };

    return Genre
}