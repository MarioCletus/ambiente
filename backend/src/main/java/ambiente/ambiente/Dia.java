package ambiente.ambiente;


import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Dia {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")
	private Integer id;

	@Column(name = "fecha")
	private Date fecha;

	@Column(name = "perfil_id")
	Integer perfil_id;
	
	public Integer getId() {
		return id;
	}

	public Integer getPerfil_id() {
		return perfil_id;
	}

	public void setPerfil_id(Integer perfil_id) {
		this.perfil_id = perfil_id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

}
