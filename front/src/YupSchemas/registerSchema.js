// LIBRARIES
import * as yup from 'yup';

// regex pour les noms et prénoms
const namesRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\s'.-]+$/;
// regex pour les caractères interdits
const forbiddenChars = /[$<>;]/;

const registerSchema = yup.object().shape({

  email: yup
    .string()
    .trim()
    .required('Champ Requis')
    .email("L'email n'est pas valide"),

  password: yup
    .string()
    .required('Champ Requis')
    .test('forbiddenChars', 'Caractère interdit', value => !forbiddenChars.test(value))
    .trim()
    .min(6, `Veuillez mettre au minimum 6 caractères`)
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins 1 minuscule')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins 1 majuscule')
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins 1 chiffre'),

  username: yup
    .string()
    .required('Champ Requis')
    .test('forbiddenChars', 'Caractère interdit', value => !forbiddenChars.test(value))
    .trim()
    .min(2, 'Le pseudo doit contenir au minimum 2 caractères')
    .max(15, 'Le pseudo de peut pas dépasser 15 caractères'),

  firstname: yup
    .string()
    .trim()
    .required('Champ Requis')
    .matches(namesRegex, 'Le prénom peut contenir : majuscules, minuscules & espaces')
    .min(2, 'Le prénom doit contenir au minimum 2 caractères')
    .max(15, 'Le prénom de peut pas dépasser 15 caractères'),

  lastname: yup
    .string()
    .trim()
    .required('Champ Requis')
    .matches(namesRegex, 'Le nom peut contenir : majuscules, minuscules & espaces')
    .min(2, 'Le nom doit contenir au minimum 2 caractères')
    .max(15, 'Le nom de peut pas dépasser 15 caractères'),

});

export default registerSchema;

