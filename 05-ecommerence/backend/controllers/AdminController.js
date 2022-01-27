import {save} from '../models/Gallery.js'

const uploadImage = async (req, res) => {
	const saved = await save({
		name: req.file.filename
	})
	if (!saved) {
		res.status(422).json({
			condition: false,
			message: "Image upload failed"
		})
	}
	// section onImageUploadSuccess
 /*
 *               ___                            _   _       _                 _ ____
 *    ___  _ __ |_ _|_ __ ___   __ _  __ _  ___| | | |_ __ | | ___   __ _  __| / ___| _   _  ___ ___ ___  ___ ___
 *   / _ \| '_ \ | || '_ ` _ \ / _` |/ _` |/ _ \ | | | '_ \| |/ _ \ / _` |/ _` \___ \| | | |/ __/ __/ _ \/ __/ __|
 *  | (_) | | | || || | | | | | (_| | (_| |  __/ |_| | |_) | | (_) | (_| | (_| |___) | |_| | (_| (_|  __/\__ \__ \
 *   \___/|_| |_|___|_| |_| |_|\__,_|\__, |\___|\___/| .__/|_|\___/ \__,_|\__,_|____/ \__,_|\___\___\___||___/___/
 *                                   |___/           |_|
 */

	res.json({
		conditon: true,
		message: "Image upload success"
	})
}

export {uploadImage}