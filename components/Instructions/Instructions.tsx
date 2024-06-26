import React from 'react'
import styles from './Instructions.module.css'

const Instructions = () => (
	<div className={styles.container}>
		<h2 className={styles["main-heading"]}>How to</h2>
		<section className={styles.section}>
			<h3 className={styles["sub-heading"]}>Login</h3>
			<p className={styles.paragraph}>
				In the current version (0.10.x), authentication is handled by GitHub or Google OAuth. <br />
				Simply log in with your GitHub or Google account clicking on the login button on this page, <br />
				and the app will redirect you to the index card home page.
			</p>
		</section>

		<section className={styles.section}>
			<h3 className={styles["sub-heading"]}>Logout</h3>
			<h4 className={styles["sub-sub-heading"]}>On the home page</h4>
			<ol className={styles.list}>
				<li className={styles["list-item"]}>Click on the logout button.</li>
			</ol>
		</section>

		<section className={styles.section}>
			<h3 className={styles["sub-heading"]}>Create a New Index Card</h3>
			<h4 className={styles["sub-sub-heading"]}>On the home page</h4>
			<ol className={styles.list}>
				<li className={styles["list-item"]}>Click on the Create new index card button.</li>
			</ol>
		</section>

		<section className={styles.section}>
			<h3 className={styles["sub-heading"]}>Delete an Index Card</h3>
			<h4 className={styles["sub-sub-heading"]}>On the home page</h4>
			<ol className={styles.list}>
				<li className={styles["list-item"]}>Click on the trash bin icon button next to the index card you wish to delete.</li>
			</ol>
		</section>

		<section className={styles.section}>
			<h3 className={styles["sub-heading"]}>Access an Index Card</h3>
			<h4 className={styles["sub-sub-heading"]}>On the home page</h4>
			<ol className={styles.list}>
				<li className={styles["list-item"]}>Click on the number of the index card.</li>
				<li className={styles["list-item"]}>This will redirect you to the editor view.</li>
			</ol>
		</section>

		<section className={styles.section}>
			<h3 className={styles["sub-heading"]}>Edit an Index Card</h3>
			<h4 className={styles["sub-sub-heading"]}>On the editor view</h4>
			<p className={styles.paragraph}>There are three text fields:</p>
			<ul className={styles.list}>
				<li className={styles["list-item"]}><strong>Scene Heading</strong>: For the location of the scene.</li>
				<li className={styles["list-item"]}><strong>Synopsis</strong>: For the main content of the scene.</li>
				<li className={styles["list-item"]}><strong>Conflict</strong>: For the conflict of the scene.</li>
			</ul>
		</section>

		<section className={styles.section}>
			<h3 className={styles["sub-heading"]}>Save an Index Card</h3>
			<h4 className={styles["sub-sub-heading"]}>On the editor view</h4>
			<ol className={styles.list}>
				<li className={styles["list-item"]}>All changes are saved automatically.</li>
			</ol>
		</section>

		<section className={styles.section}>
			<h3 className={styles["sub-heading"]}>Create a New Index Card</h3>
			<h4 className={styles["sub-sub-heading"]}>On the editor view</h4>
			<ol className={styles.list}>
				<li className={styles["list-item"]}>Click on the Options button (ᐯ).</li>
				<li className={styles["list-item"]}>Click on the Create new index card button.</li>
			</ol>
		</section>

		<section className={styles.section}>
			<h3 className={styles["sub-heading"]}>Delete an Index Card</h3>
			<h4 className={styles["sub-sub-heading"]}>On the editor view</h4>
			<ol className={styles.list}>
				<li className={styles["list-item"]}>Click on the Options button (ᐯ).</li>
				<li className={styles["list-item"]}>Click on the Delete current index card button.</li>
			</ol>
		</section>

		<section className={styles.section}>
			<h3 className={styles["sub-heading"]}>Navigate Between Index Cards</h3>
			<ol className={styles.list}>
				<li className={styles["list-item"]}>Use the left and right arrows to navigate between index cards.</li>
			</ol>
		</section>
	</div>
)

export default Instructions
