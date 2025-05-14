import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material'

import { useNavigate } from 'react-router-dom'

import type { RootState } from '../store/store'
import {
    getFamilyTrees,
    createFamilyTree,
    updateFamilyTree,
    deleteFamilyTree,
} from '../actions/familyTreeActions'
import toast from 'react-hot-toast'

export default function Main() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const trees = useSelector((state: RootState) => state.familyTree.trees)

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [editingId, setEditingId] = useState<number | null>(null)

    useEffect(() => {
        dispatch(getFamilyTrees())
    }, [dispatch])

    const handleOpenCreate = () => {
        setEditingId(null)
        setTitle('')
        setOpen(true)
    }

    const handleOpenEdit = (id: number, currentTitle: string) => {
        setEditingId(id)
        setTitle(currentTitle)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setEditingId(null)
        setTitle('')
    }

    const handleSubmit = () => {
        const trimmed = title.trim()
        if (!trimmed) return

        if (editingId == null) {
            dispatch(createFamilyTree(trimmed))
            toast.success('Family tree created successfully!')
        } else {
            dispatch(updateFamilyTree(editingId, trimmed))
            toast.success('Family tree updated successfully!')
        }
        handleClose()
    }

    const handleDelete = (id: number) => {
        dispatch(deleteFamilyTree(id))
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Family Trees
            </Typography>

            {trees.length === 0 ? (
                <Box textAlign="center" mt={6}>
                    <Typography variant="body1" gutterBottom>
                        No family trees found.
                    </Typography>
                    <Button variant="contained" onClick={handleOpenCreate}>
                        Create New Family Tree
                    </Button>
                </Box>
            ) : (
                <>
                    <Button variant="contained" sx={{ mb: 3 }} onClick={handleOpenCreate}>
                        + Create New Tree
                    </Button>

                    <Grid container spacing={3}>
                        {trees.map((tree: any) => (
                            <Grid key={tree.tree_id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{tree.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Created: {new Date(tree.created_at).toLocaleDateString()}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => navigate(`/${tree.tree_id}`)}>
                                            View
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={() => handleOpenEdit(tree.tree_id, tree.title)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => handleDelete(tree.tree_id)}
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {editingId == null ? 'Create New Family Tree' : 'Edit Family Tree'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingId == null ? 'Create' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
