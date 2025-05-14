import express from 'express'
import familyRoutes from "./routes/familyRoutes"
import familyMemberRoutes from "./routes/familyMemberRoutes"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/family-trees', familyRoutes)
app.use('/api/family-members', familyMemberRoutes)
export default app