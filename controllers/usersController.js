const usersController = {
    register: async (req, res) => {
        try {
            return res.status(200).json({ message: "helo dari controller" })
        } catch (err) {
            return res.status(403).json({ message: err })
        }
    },

    login: async (req, res) => {
        try {
            return res.status(200).json({ message: "helo dari controller" })
        } catch (err) {
            return res.status(403).json({ message: err })
        }
    },

    info: async (req, res) => {
        try {
            return res.status(200).json({ message: "helo dari controller" })
        } catch (err) {
            return res.status(403).json({ message: err })
        }
    }
}

module.exports = usersController

