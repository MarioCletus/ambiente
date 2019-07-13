package ambiente.ambiente;

import java.util.List;
import java.util.Optional;

public interface DiaService {
	void nuevoDia( Perfil perfil);
	void editarDia(Perfil perfil);
	void borrarDia(Integer id);
	Optional<Perfil> getDia(Integer id);
	List<Perfil> getDias();
}