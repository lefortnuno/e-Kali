const router = require("express").Router();
const LokaController = require("../controllers/loka.controller");
const user = require("../middlewares/user.middleware");

router.post("/", user.checkUtilisateur, LokaController.addLoka);
router.post("/filtre", user.checkUtilisateur, LokaController.filtreLoka);
router.post("/recherche", user.checkUtilisateur, LokaController.searchSomeLoka);

router.get("/:id", user.checkUtilisateur, LokaController.getIdLoka);
router.get("/rehetra/:id", user.checkUtilisateur, LokaController.getAllMyLoka);

router.put("/:id", user.checkUtilisateur, LokaController.updateMyLoka);

router.delete("/:id", user.checkUtilisateur, LokaController.deleteMyLoka);

module.exports = router;
