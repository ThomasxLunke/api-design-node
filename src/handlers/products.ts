import prisma from "../db"

// Get all
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    include: {
      Product: true
    }
  })

  res.json({data: user.Product})
}

// Get one
export const getOneProduct = async (req, res) => {
  const id = req.params.id

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id
    }
  })

  res.json({data: product})
}

// Create one
export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id
    }
  })

  res.json({data: product})
}


// Update one
export const updateProduct = async (req, res, next) => {
  try {
    const updated = await prisma.product.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id
        }
      },
      data: {
        name: req.body.name
      }
    })
  
    res.json({data: updated})
  } catch (error) {
    next(error)
  }
  
}

// Delete one
export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id
      }
    }
  })

  res.json({data: deleted})
}