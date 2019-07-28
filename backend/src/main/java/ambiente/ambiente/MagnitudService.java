package ambiente.ambiente;
import java.util.List;
import java.util.Optional;

public interface MagnitudService {
	Magnitud nuevoMagnitud( Magnitud magnitud);
	void editarMagnitud(Magnitud magnitud);
	void borrarMagnitud(Integer id);
	Optional<Magnitud> getMagnitud(Integer id);
	List<Magnitud> getMagnitudes();
}