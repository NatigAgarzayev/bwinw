import {
    Box,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export type MemberPosition = | 'grandparent' | 'parent' | 'child' | 'grandchild'

export type TreeFrameProps = {
    openAdd: (parentId: number | null, position: MemberPosition) => void
}

export default function TreeFrame({ openAdd }: TreeFrameProps) {
    return (
        <Box>
            <Button
                variant="contained"
                onClick={() => openAdd(null, 'grandparent')}
                sx={{ mb: 2 }}
            >
                + Add Grandparent
            </Button>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ flexGrow: 1 }}>Grandparent</Typography>
                    <Button
                        size="small"
                        onClick={e => { e.stopPropagation(); openAdd(null, 'parent') }}
                    >
                        + Add Parent
                    </Button>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ ml: 2 }}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography sx={{ flexGrow: 1 }}>Parent</Typography>
                                <Button
                                    size="small"
                                    onClick={e => { e.stopPropagation(); openAdd(null, 'child') }}
                                >
                                    + Add Child
                                </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ ml: 2 }}>
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography sx={{ flexGrow: 1 }}>Child</Typography>
                                            <Button
                                                size="small"
                                                onClick={e => { e.stopPropagation(); openAdd(null, 'grandchild') }}
                                            >
                                                + Add Grandchild
                                            </Button>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box sx={{ ml: 2 }}>
                                                <Accordion disabled>
                                                    <AccordionSummary>
                                                        <Typography>Grandchild</Typography>
                                                    </AccordionSummary>
                                                </Accordion>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
