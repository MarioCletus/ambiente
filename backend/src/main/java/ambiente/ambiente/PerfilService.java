package ambiente.ambiente;
import java.util.List;
import java.util.Optional;

public interface PerfilService {
	void nuevoPerfil( Perfil perfil);
	void editarPerfil(Perfil perfil);
	void borrarPerfil(Integer id);
	Optional<Perfil> getPerfil(Integer id);
	List<Perfil> getPerfiles();
}