/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id: 
 *           type: integer
 *           required: false
 *         role: 
 *           type: string
 *           required: false
 *         email:
 *           type: string
 *           required: true
 *         name:
 *           type: string
 *           required: true
 *         dni:
 *           type: string
 *           required: true
 *         cuit:
 *           type: string
 *           required: true
 *         state:
 *           type: string
 *           required: true
 *         city:
 *           type: string
 *           required: true
 *         neighborhood:
 *           type: string
 *           required: true
 *         address:
 *           type: string
 *           required: true
 *         phone:
 *           type: string
 *           required: true
 *         password:
 *           type: string
 *           required: true
 *         billVoucher:
 *           type: string
 *           required: true
 */

 /**
 * @swagger
 * components:
 *   dtos:
 *     UserDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *         name:
 *           type: string
 *           required: true
 *         dni:
 *           type: string
 *           required: true
 *         cuit:
 *           type: string
 *           required: true
 *         state:
 *           type: string
 *           required: true
 *         city:
 *           type: string
 *           required: true
 *         neighborhood:
 *           type: string
 *           required: true
 *         address:
 *           type: string
 *           required: true
 *         phone:
 *           type: string
 *           required: true
 *         password:
 *           type: string
 *           required: true
 *         billVoucher:
 *           type: string
 *           required: true
 */

 /**
 * @swagger
 * components:
 *   schemas:
 *     Professional:
 *       type: object
 *       properties:
 *         _id: 
 *           type: integer
 *           required: false
 *         role: 
 *           type: string
 *           required: false
 *         email:
 *           type: string
 *           required: true
 *         name:
 *           type: string
 *           required: true
 *         dni:
 *           type: string
 *           required: true
 *         cuit:
 *           type: string
 *           required: true
 *         state:
 *           type: string
 *           required: true
 *         city:
 *           type: string
 *           required: true
 *         neighborhood:
 *           type: string
 *           required: true
 *         address:
 *           type: string
 *           required: true
 *         phone:
 *           type: string
 *           required: true
 *         password:
 *           type: string
 *           required: true
 *         billVoucher:
 *           type: string
 *           required: true
 *         monotax:
 *           type: string
 *           required: true
 */

 /**
 * @swagger
 * components:
 *   dtos:
 *     ProfessionalDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *         name:
 *           type: string
 *           required: true
 *         dni:
 *           type: string
 *           required: true
 *         cuit:
 *           type: string
 *           required: true
 *         state:
 *           type: string
 *           required: true
 *         city:
 *           type: string
 *           required: true
 *         neighborhood:
 *           type: string
 *           required: true
 *         address:
 *           type: string
 *           required: true
 *         phone:
 *           type: string
 *           required: true
 *         password:
 *           type: string
 *           required: true
 *         billVoucher:
 *           type: string
 *           required: true
 *         monotax:
 *           type: string
 *           required: true
 */

  /**
 * @swagger
 * components:
 *   dtos:
 *     SignInDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *         password:
 *           type: string
 *           required: true
 */

// SERVICE

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         _id: 
 *           type: integer
 *         name: 
 *           type: string
 *           required: true
 *         description:
 *           type: string
 *           required: true
 *         category:
 *           type: integer
 *           required: true
 *         mainImage:
 *           type: integer
 */


 /**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         _id: 
 *           type: object
 *         user: 
 *           type: integer
 *           required: true
 *         name:
 *           type: string
 *           required: true
 *         cvv:
 *           type: string
 *           required: true
 *         expirationDate:
 *           type: string
 *           required: true
 *         bank:
 *           type: string
 */

 /**
 * @swagger
 * components:
 *   dtos:
 *     PaymentDTO:
 *       type: object
 *       properties:
 *         user: 
 *           type: integer
 *           required: true
 *         name:
 *           type: string
 *           required: true
 *         cvv:
 *           type: string
 *           required: true
 *         expirationDate:
 *           type: string
 *           required: true
 *         bank:
 *           type: string
 */


 /**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id: 
 *           type: object
 *         user: 
 *           type: integer
 *           required: true
 *         description:
 *           type: string
 *           required: true
 *         professional:
 *           type: integer
 *           required: true
 *         eventId:
 *           type: integer
 *           required: true
 *         rating:
 *           type: float
 *           required: true
 */

 /**
 * @swagger
 * components:
 *   dtos:
 *     CommentDTO:
 *       type: object
 *       properties:
 *         user: 
 *           type: integer
 *           required: true
 *         description:
 *           type: string
 *           required: true
 *         professional:
 *           type: integer
 *           required: true
 *         eventId:
 *           type: integer
 *           required: true
 *         rating:
 *           type: float
 *           required: true
 */


 /**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id: 
 *           type: object
 *         name: 
 *           type: string
 *           required: true
 *         description:
 *           type: string
 *           required: true
 *         imgs:
 *           type: array
 *           required: true
 *         mainImage:
 *           type: String
 *           required: true
 */

  /**
 * @swagger
 * components:
 *   dtos:
 *     CategoryDTO:
 *       type: object
 *       properties:
 *         name: 
 *           type: string
 *           required: true
 *         description:
 *           type: string
 *           required: true
 *         imgs:
 *           type: array
 *           required: true
 *         mainImage:
 *           type: String
 *           required: true
 */