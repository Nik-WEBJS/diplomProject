import { body } from "express-validator"

export const registerValidator = [
    body('email', 'неверный формат почты').isEmail(),
    body('password','минимум 5 символов').isLength({min:5}),
    body('fullName','минимум 3 символа').isLength({min:3}),
    body('avatarUrl','Неверная ссылка на аватарку').optional().isURL(),
];