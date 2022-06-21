const express = require('express');
const { body } = require('express-validator')

const movieValidate = [
    body("title").notEmpty().withMessage('O Filme Precisa do Titulo').isString(),
    body("rating").notEmpty().withMessage('Qual a Avaliação do Filme'),
    body("awards").notEmpty().withMessage('Ele Tem Premios ?'),
    body("release_date").notEmpty().withMessage('Por Favor Digite a Data de Lançamento'),
    body("length").notEmpty().withMessage('Digite a duração do filme'),
    body("genre_id").notEmpty().withMessage('Escolha um Genero Valido'),

];

module.exports = movieValidate

// let errors = validationResult(req)
// if(errors.isEmpty()){            
// }else{
//     console.log(errors.mapped())
//     return res.render('produtos', {errors: errors.mapped(), old: req.body});
// }

// store: async (req,res) => {
//     const { nome , email , senha} = req.body
//     let criptografada = bcrypt.hashSync(senha, 10)

//     await Usuario.create({
//         nome,
//         email,
//         senha:criptografada
//     })

//     return res.redirect('/users')
// },

{/* <form action="/produtos/criar" method="POST" >
        <h3>Nome do Vendedor</h3>
        <input value="<%= locals.old && old.vendedor %>" type="text" name="vendedor" id="">
        <h3>Nome Do Produto</h3>
        <input value="<%= locals.old && old.produto %>" type="text" name="produto" id="">
        <h3>Preço do Produto</h3>
        <input value="<%= locals.old && old.preco %>" type="number" name="preco" id="">
        <br><br>
        <button type="submit">Cadastrar Produto</button>

        <% if (typeof(errors) != "undefined") { %>
                             
            <ul>
                <% for(let error in errors){ %>
                    <li> <%= errors[error].msg %></li>
                <% } %>            
            </ul>
        <% } %>

    </form> */}