export enum AppointmentStatus {
  pending = 'pending',           // Pendiente de pago
  paid = 'paid',                // Pagada pero no confirmada
  confirmed = 'confirmed',      // Confirmada por el médico
  rejected = 'rejected',        // Rechazada por el médico
  cancelled = 'cancelled',      // Cancelada por el paciente
  completed = 'completed'       // Cita completada
} 