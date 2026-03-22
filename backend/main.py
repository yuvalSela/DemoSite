import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time

app = FastAPI(title="TalentSync HR API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PayrollRequest(BaseModel):
    employees_count: int
    cycle_id: str

@app.post("/api/run-payroll")
async def run_payroll(request: PayrollRequest):
    # This endpoint is a dummy endpoint targeted to mock a GitHub pipeline execution
    # For now, it will realistically sleep and return success parameters
    await asyncio.sleep(2.0)
    return {
        "status": "success",
        "message": f"Pipeline success: Payroll cycle {request.cycle_id} for {request.employees_count} employees completed.",
        "transaction_id": f"txn_{int(time.time())}"
    }

@app.get("/api/employees")
async def get_employees():
    return [
        {"id": 1, "name": "Sarah Connor", "role": "Engineering Manager", "status": "active"},
        {"id": 2, "name": "John Smith", "role": "Product Designer", "status": "active"},
        {"id": 3, "name": "Emily Chen", "role": "Marketing Rep", "status": "on_leave"},
        {"id": 4, "name": "Michael Brown", "role": "Senior Engineer", "status": "active"},
    ]
