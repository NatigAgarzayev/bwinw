import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Container,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControlLabel,
    Checkbox,
    Stack,
    RadioGroup,
    Radio,
    FormLabel,
    MenuItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Box,
    Button
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import {
    getFamilyMembers,
    createFamilyMember,
    updateFamilyMember,
    deleteFamilyMember
} from '../actions/familyMemberActions'

type MemberPosition = 'grandparent' | 'parent' | 'child' | 'grandchild'

type Member = {
    id: number
    tree_id: number
    parent_id: number | null
    name: string
    gender: boolean
    alive: boolean
    birth_date: string
    death_date: string | null
    position: MemberPosition
}

export default function FamilyTree() {
    const { id } = useParams<{ id: string }>()
    const treeId = parseInt(id!, 10)
    const dispatch = useDispatch()
    const members = useSelector((s: RootState) => s.familyMember.members) as Member[]
    const navigate = useNavigate()
    const blank = {
        tree_id: treeId,
        parent_id: null as number | null,
        name: '',
        gender: true,
        alive: true,
        birth_date: '',
        death_date: null as string | null,
        position: 'child' as MemberPosition
    }

    const [open, setOpen] = useState(false)
    const [editing, setEditing] = useState<Member | null>(null)
    const [form, setForm] = useState<Omit<Member, 'id'>>({ ...blank })

    useEffect(() => {
        dispatch(getFamilyMembers(treeId))
    }, [dispatch, treeId])

    const handleOpen = (parent_id: number | null, position: MemberPosition, edit?: Member) => {
        if (edit) {
            setEditing(edit)
            setForm({
                tree_id: edit.tree_id,
                parent_id: edit.parent_id,
                name: edit.name,
                gender: edit.gender,
                alive: edit.alive,
                birth_date: edit.birth_date,
                death_date: edit.death_date,
                position: edit.position
            })
        } else {
            setEditing(null)
            setForm({ ...blank, parent_id, position })
        }
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setEditing(null)
        setForm({ ...blank })
    }

    const handleSubmit = () => {
        if (!form.name || !form.birth_date) return
        const payload = { ...form, parent_id: form.parent_id || null }
        if (editing) {
            dispatch(updateFamilyMember(editing.id, payload))
        } else {
            dispatch(createFamilyMember(payload))
        }
        handleClose()
    }

    const handleDelete = (memberId: number) => {
        dispatch(deleteFamilyMember(memberId, treeId))
    }

    const childrenOf = (parent_id: number | null, position: MemberPosition) =>
        members.filter(m => m.parent_id === parent_id && m.position === position)

    const nextPos = (p: MemberPosition): MemberPosition => {
        if (p === 'grandparent') return 'parent'
        if (p === 'parent') return 'child'
        return 'grandchild'
    }

    const Level = ({
        parent_id,
        position,
        title
    }: {
        parent_id: number | null
        position: MemberPosition
        title: string
    }) => {
        const kids = childrenOf(parent_id, position)
        return (
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ flex: 1 }}>{title}</Typography>
                    <Button
                        size="small"
                        onClick={e => { e.stopPropagation(); handleOpen(parent_id, position) }}
                    >
                        + Add
                    </Button>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ ml: 2 }}>
                        {kids.map(m => (
                            <Box
                                key={m.id}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                mb={1}
                                sx={{ p: 1, border: '1px solid #eee', borderRadius: 1 }}
                            >
                                <Box alignItems="center">
                                    <Box display="flex" alignItems="center">
                                        <FiberManualRecordIcon
                                            sx={{
                                                fontSize: '0.8rem',
                                                color: m.alive ? 'success.main' : 'error.main',
                                                mr: 0.5,
                                            }}
                                        />
                                        <Typography
                                            style={{ color: `${m.gender ? "#0000FF" : "#FF69B4"}` }}
                                        >
                                            {m.name}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            {m.position},{' '}
                                            {m.alive
                                                ? `b. ${dayjs(m.birth_date).format('MMM D, YYYY')}`
                                                : `b. ${m.birth_date ? dayjs(m.birth_date).format('MMM D, YYYY') : "--"} - d. ${m.death_date ? dayjs(m.death_date).format('MMM D, YYYY') : '—'}`}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpen(m.parent_id, m.position, m)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(m.id)}
                                    >
                                        <DeleteIcon fontSize="small" color="error" />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                        {position !== 'grandchild' && (
                            <Level
                                parent_id={parent_id}
                                position={nextPos(position)}
                                title={nextPos(position)[0].toUpperCase() + nextPos(position).slice(1)}
                            />
                        )}
                    </Box>
                </AccordionDetails>
            </Accordion>
        )
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/")}
                sx={{ mb: 2 }}
            >
                Go Back
            </Button>
            <Typography variant="h4" gutterBottom>Family Tree</Typography>
            <Level parent_id={null} position="grandparent" title="Grandparent" />

            {/* Add/Edit Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>{editing ? 'Edit Member' : 'Add Member'}</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={2} mt={1}>
                            <TextField
                                select
                                label="Role"
                                fullWidth
                                value={form.position}
                                onChange={e => setForm(f => ({ ...f, position: e.target.value as MemberPosition }))}
                            >
                                {['grandparent', 'parent', 'child', 'grandchild'].map(p => (
                                    <MenuItem key={p} value={p}>{p}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Name"
                                fullWidth
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            />
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                row
                                value={form.gender ? 'male' : 'female'}
                                onChange={e => setForm(f => ({ ...f, gender: e.target.value === 'male' }))}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>

                            <DatePicker
                                label="Birth Date"
                                value={form.birth_date ? dayjs(form.birth_date) : null}
                                onChange={(d: Dayjs | null) =>
                                    setForm(f => ({ ...f, birth_date: d?.format('YYYY-MM-DD') || '' }))
                                }
                                slotProps={{
                                    textField: { fullWidth: true as const }
                                }}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={form.alive}
                                        onChange={() => setForm(f => ({ ...f, alive: !f.alive, death_date: null }))}
                                    />
                                }
                                label="Is Alive"
                            />

                            {!form.alive && (
                                <DatePicker
                                    label="Death Date"
                                    value={form.death_date ? dayjs(form.death_date) : null}
                                    onChange={(d: Dayjs | null) =>
                                        setForm(f => ({ ...f, death_date: d?.format('YYYY-MM-DD') || null }))
                                    }
                                    slotProps={{
                                        textField: { fullWidth: true as const }
                                    }}
                                />
                            )}
                        </Stack>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        {editing ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
