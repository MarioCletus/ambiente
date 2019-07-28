package ambiente.ambiente;

import java.util.List;
import java.util.Optional;

public interface DiaService {
	Dia nuevoDia( Dia dia);
	void editarDia(Dia dia);
	void borrarDia(Integer id);
	Optional<Dia> getDia(Integer id);
	List<Dia> getDias();
}
