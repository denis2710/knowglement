const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator


  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }

  const save = async (req, res) => {

    const user = {...req.body }
    if(req.params.id) user.id = req.params.id

    try {
      existsOrError(user.name, 'Nome não informado')
      existsOrError(user.password, 'Senha não informado')
      existsOrError(user.confirmPassword, 'Senha não informado')
      existsOrError(user.email, 'email não informado')
      equalsOrError(user.password, user.confirmPassword, 'As senhas informadas devem ser iguais')

      const userFromDb = await app.db('users')
                                .where({email: user.email }).first()
                                .catch(e => console.log(e))

      if(!user.id){
        notExistsOrError(userFromDb, 'Usuário já cadastrado')
      }
    }catch(msg){
      return res.status(400).send(msg)
    }

    user.password = encryptPassword(req.body.password);
    delete(user.confirmPassword)

    if(user.id){
      app.db('users')
        .update(user)
        .where({id: user.id})
        .then(_ => res.status(204).send())
        .catch(err => { console.log(e);  res.status(500).send(err) })
    } else {
      app.db('users')
        .insert(user)
        .then(_ => res.status(204).send())
        .catch(err => {console.log(e); res.status(500).send(err)})
    }
  }

  const get = async (req, res) => {
    if(req.params.id){
      app.db('users')
      .select('id', 'name', 'email', 'admin')
      .where({id: req.params.id})
      .then(usuario => res.status(200).json(usuario))
      .catch(err => {console.log(err); res.status(500).send(err)})
    }else {
      app.db('users')
        .select('id', 'name', 'email', 'admin')
        .then(usuario => res.status(200).json(usuario))
        .catch(err => {console.log(err); res.status(500).send(err)})
    }
  }

  const remove = async (req, res) => {

    try{
      existsOrError(req.params.id, "Id do usuario não informado");
      app.db('users')
        .where({id: req.params.id})
        .del()
        .then(id => res.status(204))
    } catch(err) {
      console.log(err)
      res.status(500).send(err)
    }
  }

  return { save, get, remove }
}