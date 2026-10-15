# Mashal Phase 2 claim evidence

Updated: 2026-10-04

This file records only the targeted source checks used for public claims in the
Phase 2 website. It is not a replacement for the Phase 1 inventory. The Phase 1
CSV/README package named in the brief was not present in the local workspace,
the supplied attachment folder or the production website release, so no new
full inventory was generated.

| Public capability | Level | Targeted evidence in Mashal source |
| --- | --- | --- |
| Quality inspection records | A | `Models/Entities/QualityInspections.cs`, `Controllers/QualityInspectionsController.cs` |
| Laboratory, result, accept/reject | A | `QualityInspection.LaboratoryName`, `ResultNumber`, `QualityInspectionStatus` |
| Density, sulphur, flash point, water, octane/cetane | A | Numeric fields on `QualityInspection` |
| Quality documents | A | `QualityInspectionDocument` and upload/export controller flows |
| Operational assets and ownership | A | `Models/Entities/OperationalAssets.cs` |
| Meter readings and maintenance | A | `AssetMeterReading`, `AssetMaintenanceJob` |
| Maintenance schedule, downtime and linked expense | A | `ScheduledDate`, `DowntimeFrom/To`, `ExpenseTransactionId` |
| Customs declaration, permit holder, type and weight | A | `Models/Entities/CustomsAndDeclarations.cs`, `Models/Customs/CustomsDeclarationViewModels.cs` |
| Customs expenses, documents and settlement | A | `Controllers/CustomsDeclarationsController.cs`, `Services/Customs/CustomsDeclarationExpenseSync.cs` |
| Customs Excel import and report export | A | `CustomsDeclarationsController.ImportExcel`, `CustomsDeclarationsController.Export.cs` |
| Presale, customer receipts and allocations | A | `Controllers/SalesController.PreSale.cs`, `Services/Reporting/PreSaleReservationService.cs` |
| Management reports and exports | A | `Controllers/ReportsController.cs`, `Controllers/ReportsController.Export.cs` |
| Operational-period lock and reopen reason | A | `OperationalPeriodLocksController`, `OperationalPeriodLock` |
| Backup and restore | A | `BackupsController`, `BackupRestoreController`, `Services/Backups/*` |
| Employee details and department/job | A | `Models/Entities/Employees.cs`, `EmployeesController.cs` |
| Salary transactions, advance, deduction and bonus | A | `EmployeeSalaryTransactionType` and employee salary flows |
| Attendance, leave and full payroll lifecycle | B | Not found in the source snapshot available during Phase 2; not published as current capability |
| Biometric, fingerprint, advanced shifts, overtime engine | C | No verified implementation; intentionally excluded |
| ASTM/API correction, tank strapping, gauges, weighbridge, flow meter, LIMS, HSE, offline sync | C | No verified implementation; intentionally excluded |

Level A is publishable from current evidence. Level B requires the missing Phase
1 evidence package or matching current source. Level C is roadmap only.
