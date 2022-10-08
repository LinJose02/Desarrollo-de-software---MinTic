package Service;

import Model.Reservation;
import Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    public ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        return (List<Reservation>) reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int id){
        return reservationRepository.getReservation(id);
    }

    public Reservation save(Reservation reservation){
        if(reservation.getIdReservation() == null){
            return reservationRepository.save(reservation);
        } else{
            Optional<Reservation> reservationEncontrado = reservationRepository.getReservation(reservation.getIdReservation());
            if(reservationEncontrado.isEmpty()){
                return reservationRepository.save(reservation);
            } else {
                return reservation;
            }
        }

    }

    public Reservation update(Reservation reservation){
        if(reservation.getIdReservation() != null){
            Optional<Reservation> reservationEncontrado = reservationRepository.getReservation(reservation.getIdReservation());
            if(!reservationEncontrado.isEmpty()){
                if(reservation.getStartDate() != null){
                    reservationEncontrado.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getEndDate() != null){
                    reservationEncontrado.get().setEndDate(reservation.getEndDate());
                }
                if(reservation.getStatus() != null){
                    reservationEncontrado.get().setStatus(reservation.getStatus());
                }
                return reservationRepository.save(reservationEncontrado.get());
            }
        }
        return reservation;
    }

    public boolean deleteReservation(int reservationId){
        Boolean resultado = getReservation(reservationId).map(reservationPorEliminar ->{
            reservationRepository.delete(reservationPorEliminar);
            return true;
        }) .orElse(false);

        return resultado;
    }


}
