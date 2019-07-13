package ambiente.ambiente;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImp implements UsuarioService{
	
	@Autowired
	private UsuarioRepository repo;

	@Override
	public void nuevoUsuario(Usuario usuario) {
		repo.save(usuario);
	}

	@Override
	public void editarUsuario(Usuario usuario) {
		repo.save(usuario);
	}

	@Override
	public void borrarUsuario(Integer id) {
		
		for (Usuario usuario:repo.findAll()) {
			if (usuario.getId().equals(id)) {
				repo.delete(usuario);
				return;
			}
		}
			
	}

	@Override
	public Optional<Usuario> getUsuario(Integer id) {
		Optional<Usuario> usuario=repo.findById(id);
		return usuario;
	}

	@Override
	public List<Usuario> getUsuarios() {
		return repo.findAll();
	}

	@Override
	public boolean isRegsitered(Usuario usuario) {
		List<Usuario> user=repo.findByUserName(usuario.getUserName());
		if(user.size()!=1)
			return false;
		System.out.println("En BD    Usuario: " + user.get(0).getUserName() + "  Password: " + user.get(0).getPassword());
		System.out.println("Entrante Usuario: " + usuario.getUserName() + "  Password: " + usuario.getPassword());
		
		if(usuario.getPassword().equals(user.get(0).getPassword())) {
			System.out.println("Usuario y contraseña correctos");
			return true;
			}
		return false;
	}

}
