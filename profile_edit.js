const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const router = express.Router();
const User = mongoose.model('User');

// Middleware para verificar se o usuário está logado
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'token_missing' });

    jwt.verify(token, process.env.JWT_SECRET || 'evollogic_secret_key', (err, decoded) => {
        if (err) return res.status(403).json({ error: 'token_invalid_or_expired' });
        req.user = decoded; 
        next();
    });
};

// Rota PUT para atualizar o perfil
router.put('/', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { nickname, hideNick, privateEmail, avatar, bannerColor, bannerImage } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'user_not_found' });

        // Atualiza apenas os campos que foram enviados
        if (nickname !== undefined) user.nickname = nickname;
        if (hideNick !== undefined) user.hideNick = hideNick;
        if (privateEmail !== undefined) user.privateEmail = privateEmail;
        if (avatar !== undefined) user.avatar = avatar;
        if (bannerColor !== undefined) user.bannerColor = bannerColor;
        if (bannerImage !== undefined) user.bannerImage = bannerImage;

        await user.save();

        res.status(200).json({ success: true, message: 'Perfil atualizado com sucesso!' });

    } catch (error) {
        console.error("Erro ao editar perfil:", error);
        res.status(500).json({ error: 'server_error' });
    }
});

module.exports = router;
