const { User, Message, Comment } = require('../models');

module.exports = async (req, res, next) => {

  /* on regarde l'endpoint de la requête et le status 
  de l'utilisateur contenu dans son token. On récupère
  aussi l'id contenu dans la requête */
  const status = req.token.status;
  const endpoint = req.path;
  const id = req.params.id;

  try {

    // on vérifie si le status de l'utilisateur est admin
    if (status !== 'admin') throw ({ message: "Vous n'avez les droits pour cette action", status: 403 });

    /* si l'endpoint contient user, on fait une recherche parmi les utilisateurs 
    avec l'id récupéré et on vérifie si il existe */
    if (endpoint.search('user') !== -1) {
      const user = await User.findByPk(id);
      if (!user) throw ({ message: "Utilisateur non trouvé", status: 404 });
    }

    /* si l'endpoint contient message, on fait une recherche parmi les messages 
    avec l'id récupéré et on vérifie si il existe */
    if (endpoint.search('message') !== -1) {
      const message = await Message.findByPk(id);
      if (!message) throw ({ message: "Message non trouvé", status: 404 });
    }

    /* si l'endpoint contient comment, on fait une recherche parmi les commentaires 
    avec l'id récupéré et on vérifie si il existe */
    if (endpoint.search('comment') !== -1) {
      const comment = await Comment.findByPk(id);
      if (!comment) throw ({ message: "Commentaire non trouvé", status: 404 });
    }

    next();

  } catch (err) {
    return err.message && err.status
      ? res.status(err.status).json({ message: err.message })
      : res.status(400).json(err);
  }

};