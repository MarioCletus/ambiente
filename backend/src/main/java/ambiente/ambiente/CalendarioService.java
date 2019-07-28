package ambiente.ambiente;

import java.util.List;
import java.util.Optional;

public interface CalendarioService {
	Calendario nuevoCalendario( Calendario calendario);
	void editarCalendario(Calendario calendario);
	void borrarCalendario(Integer id);
	Optional<Calendario> getCalendario(Integer id);
	List<Calendario> getCalendarios();
}
